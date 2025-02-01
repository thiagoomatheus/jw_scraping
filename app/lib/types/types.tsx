export type Partes = {
  id?: string
  semana: string
  canticos: string[]
  capitulos: string
  diaReuniao: string
  outros: {
    id?: string
    nome: string
    tempo?: string
    participante?: string
  }[]
  tesouros: {
    id?: string
    nome: string
    tempo?: string
    participante?: string
  }[]
  ministerio: {
    id?: string
    nome: string
    tempo?: string
    participante?: string
  }[]
  vida: {
    id?: string
    nome: string
    tempo?: string
    participante?: string
  }[]
}

export type Contato = {
  id: string
  pushName: string
  profilePictureUrl: null,
  owner: string
}