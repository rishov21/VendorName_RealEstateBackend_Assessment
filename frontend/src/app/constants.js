export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
export const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?name=Agent&size=300&background=2563eb&color=fff&bold=true';

export const getAgentPhoto = (photoUrl) => {
    return photoUrl && photoUrl.trim() !== '' ? photoUrl : DEFAULT_AVATAR;
};
