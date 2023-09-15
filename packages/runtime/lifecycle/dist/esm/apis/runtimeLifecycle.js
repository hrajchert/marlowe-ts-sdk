export const onlyByContractIds = (contractIds) => ({
    byContractIds: contractIds,
    byMyRoleTokens: (myRoles) => myRoles,
});
