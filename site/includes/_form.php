<form id="login-form" action="/" method="post" class="login-form">
  <header>
    <h3 class="title">Log in to our site</h3>
    <p class="text">Enter username or password to log on</p>
  </header>
  <section>
    <fieldset>
      <legend>form login</legend>
      <div class="form-item">
        <label for="username">
          <span class="sr-only">USERNAME</span>
          <input type="text" data-validate="type-required" class="input-text" id="username" name="txtUsername" placeholder="USERNAME" />
          <span class="msg-hidden"></span>
        </label>
      </div>
      <div class="form-item">
        <label for="password">
          <span class="sr-only">PASSWORD</span>
          <input type="password" data-validate="type-required" class="input-text" id="password" name="txtPassword" placeholder="PASSWORD" />
          <span class="msg-hidden"></span>
        </label>
      </div>
      <div class="form-item">
        <input type="submit" value="Sign in" class="btn-submit" />
        <span class="msg-hidden" id="return-general"></span>
      </div>
      <div class="form-item">
        <p class="extra">Don't have an account? <a href="#">Sign up here</a></p>
      </div>
    </fieldset>
  </section>
</form>