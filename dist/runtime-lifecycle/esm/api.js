const onlyByContractIds = (contractIds) => ({
    byContractIds: contractIds,
    byMyRoleTokens: (myRoles) => myRoles,
});

export { onlyByContractIds };
