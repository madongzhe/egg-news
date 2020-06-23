'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/users_list', controller.admin.users.usersList);
};
