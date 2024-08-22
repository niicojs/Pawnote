import type { FormDataFile } from "@literate.ink/utilities";
import type { SessionHandle } from "~/models";
import { aesKeys } from "~/api/private/keys";
import { AES } from "~/api/private/aes";

export class RequestUpload {
  public order: string;
  public id = `selecfile_1_${Date.now()}`;

  private url: string;
  private form: FormData;
  private headers: Record<string, string> = {};

  public constructor (
    private session: SessionHandle,
    public functionName: string,
    file: FormDataFile,
    public fileName: string
  ) {
    session.information.order++;

    const { iv, key } = aesKeys(session);
    this.order = AES.encrypt(session.information.order.toString(), key, iv);

    const form = new FormData();
    form.append("numeroOrdre", this.order);
    form.append("numeroSession", session.information.id.toString());
    form.append("nomRequete", functionName);
    form.append("idFichier", this.id);
    form.append("md5", "");
    // @ts-expect-error : trust me.
    form.append("files[]", file, fileName);

    this.form = form;
    this.url = session.information.url + `/uploadfilesession/${session.information.accountKind}/${session.information.id}`;
    this.headers["Content-Disposition"] = `attachment; filename="${encodeURI(fileName)}"`;
  }

  public async send (): Promise<void> {
    // Please, see the following comment to understand.
    // https://github.com/oven-sh/bun/issues/7917#issuecomment-1872454367
    const textBody = await new Response(this.form).text();
    this.headers["Content-Type"] = `multipart/form-data; boundary=${textBody
      .split("\n")[0]
      .slice(2)}`;

    let state = 3; // Set to UPLOADING by default.

    while (state === 3) { // UPLOADING
      const response = await this.session.fetcher({
        url: new URL(this.url),
        method: "POST",
        content: textBody,
        headers: this.headers
      });

      const json = JSON.parse(response.content);
      state = json.etat;
    }

    // Even if there's an error, it bumped.
    this.session.information.order++;

    if (state === 0) { // UNKNOWN
      throw new Error("The upload state is unknown.");
    }
    else if (state === 2) { // ERROR
      throw new Error("The upload failed.");
    }
  }
}
