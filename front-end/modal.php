<div id="user" class="modal">
  <div class="bg">
    <div class="box">
      <p class="feedback"></p>
      <div class="login">
        <h2>Log in</h2>
        <form class="nice">
          <div class="row"><label>Username</label><input name="username" type="text"/></div>
          <div class="row"><label>Password</label><input name="password" type="password"/></div>
          <div class="row"><input name="remember" type="checkbox" id="remember1" checked/>&nbsp;<label for="remember1">Remember me</label></div>
          <div class="row"><input type="submit" value="Log in"/></div>
        </form>
      </div>
      <div class="register">
        <h2>Register</h2>
        <form class="nice">
          <div class="row"><label>Username</label><input name="username" type="text"></input></div>
          <div class="row"><label>Password</label><input name="password" type="password"></input></div>
          <?php if(CAPTCHA_ENABLED): ?>
          <div class="row"><div class="g-recaptcha" data-sitekey="6LfYmtsSAAAAAE_ZK_dD-htcrd3nQa5No8Z-05Ev"></div></div>
          <?php endif; ?>
          <div class="row"><input name="remember" type="checkbox" id="remember2" checked/>&nbsp;<label for="remember2">Remember me</label></div>
          <div class="row"><input type="submit" value="Create User"></input></div>
        </form>
      </div>
    </div>
  </div>
</div>

<div id="save_bookmark" class="modal">
  <div class="bg">
    <div class="box">
      <h2>Save Bookmark <span class="close">Close <span title="Shortcut to close is esc key" class="shortcut">[esc]</span></span></h2>
      <form class="nice">
        <div class="row"><label>URL</label><input name="url" type="text"></input></div>
        <div class="row"><label>Title</label><input name="title" type="text"></input></div>
        <div class="row"><label>Notes</label><input name="notes" type="text"></input></div>
        <div class="row"><input type="submit" value="Save"></input></div>
      </form>
    </div>
  </div>
</div>
