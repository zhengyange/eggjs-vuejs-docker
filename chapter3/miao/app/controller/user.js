'use strict';

class User extends C {
  async signUp() {
    await this.ctx.verify('user.signup', 'body');
    const json = await this.ctx.service.user.signUp();
    this.ctx.body = json;
  }

  async signIn() {
    this.ctx.body = '登录';
  }
}

module.exports = User;