/**
 * Created by dzmitry_dubrovin on 27-Dec-16.
 */

var colors = {
    default: 'blue-grey',
    primary: 'blue',
    warning: 'amber',
    info: 'green',
    danger: 'red',
    success: 'lime'
};

var statuses = [
    {
        order: 1,
        name: 'New',
        value: 'NEW',
        style: colors.default
    },
    {
        order: 2,
        name: 'InProgress',
        value: 'IN_PROGRESS',
        style: colors.primary
    },
    {
        order: 3,
        name: 'Questions',
        value: 'QUESTIONS',
        style: colors.warning
    },
    {
        order: 4,
        name: 'Done',
        value: 'DONE',
        style: colors.info
    },
    {
        order: 5,
        name: 'Sent',
        value: 'SENT',
        style: colors.danger
    },
    {
        order: 6,
        name: 'Approved',
        value: 'APPROVED',
        style: colors.success
    },
    {
        order: 7,
        name: 'InDevelopment',
        value: 'IN_DEVELOPMENT',
        style: colors.warning
    },
    {
        order: 8,
        name: 'Closed',
        value: 'CLOSED',
        style: colors.success
    }
];


module.exports.statuses = statuses;