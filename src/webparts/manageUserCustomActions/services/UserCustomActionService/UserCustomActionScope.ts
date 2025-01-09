export const UserCustomActionScope = {
    Site: 'site' as 'site',
    Web: 'web' as 'web'
};

export type UserCustomActionScope = typeof UserCustomActionScope[keyof typeof UserCustomActionScope];
