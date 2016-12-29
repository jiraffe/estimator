/**
 * Created by dzmitry_dubrovin on 27-Dec-16.
 */
var statuses = [
    {
        order: 1,
        name: 'New',
        value: 'NEW',
        style: 'default'
    },
    {
        order: 2,
        name: 'InProgress',
        value: 'IN_PROGRESS',
        style: 'primary'
    },
    {
        order: 3,
        name: 'Questions',
        value: 'QUESTIONS',
        style: 'warning'
    },
    {
        order: 4,
        name: 'Done',
        value: 'DONE',
        style: 'info'
    },
    {
        order: 5,
        name: 'Sent',
        value: 'SENT',
        style: 'danger'
    },
    {
        order: 6,
        name: 'Approved',
        value: 'APPROVED',
        style: 'success'
    },
    {
        order: 7,
        name: 'InDevelopment',
        value: 'IN_DEVELOPMENT',
        style: 'warning'
    },
    {
        order: 8,
        name: 'Closed',
        value: 'CLOSED',
        style: 'success'
    }
];


module.exports.statuses = statuses;