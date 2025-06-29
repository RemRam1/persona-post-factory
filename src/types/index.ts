
export interface User {
  id: string;
  email: string;
  username: string;
}

export interface PersonaData {
  targetAudience: string;
  numId: number;
  numContent: number;
  audienceCategory: string;
  referenceTags: string;
}

export interface Persona {
  id: string;
  Nickname: string;
  Age: string;
  Gender: string;
  Job: string;
  persona: string;
  createdAt: string;
}

export interface PosterNote {
  id: string;
  title: string;
  content: string;
  coverTitle: string;
  personaId: string;
  createdAt: string;
}

export interface ImageNote {
  id: string;
  title: string;
  content: string;
  coverTitle: string;
  imageUrl: string;
  personaId: string;
  createdAt: string;
}
