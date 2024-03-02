import type { PronoteApiUserMessageRecipient } from "~/constants/recipients";
import type { PronoteApiUserResourceType } from "~/constants/users";

export class BaseMessageRecipient {
  readonly #name: string;
  readonly #type: PronoteApiUserResourceType;

  constructor (data: Omit<PronoteApiUserMessageRecipient, "N" | "P" | "refusMess">) {
    this.#name = data.L;
    this.#type = data.G;
  }

  public get name (): string {
    return this.#name;
  }

  public get type (): PronoteApiUserResourceType {
    return this.#type;
  }
}

export class FetchedMessageRecipient extends BaseMessageRecipient {
  readonly #id: string;
  readonly #refuseMessages: boolean;

  constructor (data: PronoteApiUserMessageRecipient) {
    super(data);
    this.#id = data.N;
    this.#refuseMessages = data.refusMess ?? false;
  }

  public get id (): string {
    return this.#id;
  }

  public get refuseMessages (): boolean {
    return this.#refuseMessages;
  }
}
