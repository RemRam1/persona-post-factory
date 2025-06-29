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

// 辅助函数
export const getSelectedPersonaIds = (note: PosterNote | ImageNote): string[] => {
  return note.personaId.split(',');
};

export const isMultiPersona = (note: PosterNote | ImageNote): boolean => {
  return getSelectedPersonaIds(note).length > 1;
};

export const getPersonaNames = (note: PosterNote | ImageNote, personas: Persona[]): string => {
  const ids = getSelectedPersonaIds(note);
  return personas
    .filter(p => ids.includes(p.id))
    .map(p => p.Nickname)
    .join('、');
};
