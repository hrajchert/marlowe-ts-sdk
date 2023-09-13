'use strict';

const onlyByContractIds = (contractIds) => ({
    byContractIds: contractIds,
    byMyRoleTokens: (myRoles) => myRoles,
});

exports.onlyByContractIds = onlyByContractIds;
