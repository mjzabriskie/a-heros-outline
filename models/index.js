const User = require('./User');
const Outline = require('./Outline');

User.hasMany(Outline, {
    foreignKey: 'user_id'
});

Outline.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Outline };