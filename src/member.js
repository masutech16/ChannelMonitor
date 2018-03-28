/* member.js
在室管理をするmodule
*/

// {id: string, name: string}の配列を持つ
const members = [];

const addMember = (newMember) => {
  members.push({ id: newMember.id, name: newMember.displayName });
};
const removeMember = (oldmemberId) => {
  for (let i = 0; i < members.length; i += 1) {
    if (members[i].id === oldmemberId) {
      members.splice(i, 1);
      return;
    }
  }
};
const hasMember = (memberId) => {
  for (let i = 0; i < members.length; i += 1) {
    if (members[i].id === memberId) {
      return true;
    }
  }
  return false;
};

module.exports = {
  add: addMember,
  remove: removeMember,
  has: hasMember,
};
