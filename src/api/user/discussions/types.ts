import { PronoteValue } from "~/api/type";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { Session } from "~/session";

export interface PronoteApiUserDiscussions {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Messages
    }

    donnees: {
      avecLu: boolean
      avecMessage: boolean
      possessionMessageDiscussionUnique: null
    }
  }

  response: {
    donnees: {
      listeEtiquettes: PronoteValue<24, Array<{
        /**
         * @example "Brouillons"
         */
        L: string
        N: string
        G: number
      }>>

      listeMessagerie: PronoteValue<24, Array<{
        N: string

        estUneDiscussion?: boolean
        nombreMessages?: number
        objet?: string

        listePossessionsMessages: {
          _T: number
          V: Array<{
            N: string
          }>
        }
        avecReponse?: boolean
        messagePourParticipants?: {
          _T: number
          V: {
            N: string
          }
        }
        public?: string
        dernierPossessionMessage?: {
          _T: number
          V: {
            N: string
          }
        }

        fermable?: boolean
        messageFenetre?: {
          _T: number
          V: {
            N: string
            G: number
          }
        }

        avecModifObjet?: boolean
        libelleDate?: string
        estNonPossede: boolean

        lu?: boolean

        /**
         * Only available if the item has been moved
         * to another folder(s), see `listeEtiquettes`.
         */
        listeEtiquettes?: PronoteValue<24, Array<{
          N: string
        }>>

        profondeur: number
        indicePere?: number
        nbPublic?: number
        initiateur?: string
      }>>

      strSuperAdministrateurs: string
    }
    nom: PronoteApiFunctions.Messages
  }
}

export interface ApiUserDiscussions {
  input: {
    session: Session
  }

  output: {
    data: PronoteApiUserDiscussions["response"]
  }
}
