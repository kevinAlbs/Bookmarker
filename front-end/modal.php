<div id="user" class="modal">
  <div class="bg">
    <div class="box">
      <p class="feedback"></p>
      <div class="login">
        <h2>Log in</h2>
        <form class="nice">
          <div class="row"><label>Username</label><input name="username" type="text"/></div>
          <div class="row"><label>Password</label><input name="password" type="password"/></div>
          <div class="row"><input name="remember" type="checkbox" id="remember1" checked/>&nbsp;<label for="remember1" class="remember_label">Remember me</label></div>
          <div class="row"><input type="submit" value="Log in"/></div>
        </form>
        <p>Don't have an account? <a href="#" class="register-link">Register</a><p>
      </div>
      <div class="register">
        <h2>Register</h2>
        <form class="nice">
          <div class="row"><label>Username</label><input name="username" type="text"></input></div>
          <div class="row"><label>Password</label><input name="password" type="password"></input></div>
          <?php if(CAPTCHA_ENABLED): ?>
          <div class="row"><div class="g-recaptcha" data-sitekey="6LfYmtsSAAAAAE_ZK_dD-htcrd3nQa5No8Z-05Ev"></div></div>
          <?php endif; ?>
          <div class="row"><input name="remember" type="checkbox" id="remember2" checked/>&nbsp;<label for="remember2" class="remember_label">Remember me</label></div>
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
        <div class="row"><label>Title</label><input name="title" type="text"></input><br/><a href="#" id="title_update">Refresh</a></div>
        <div class="row"><label>Notes</label><input name="notes" type="text"></input></div>
        <div class="row">Saves to the Queue</div>
        <div class="row"><input type="submit" value="Save"></input></div>
      </form>
    </div>
  </div>
</div>

<div id="import" class="modal">
  <div class="bg">
    <div class="box">
      <h2>Import Bookmarks <span class="close">Close <span title="Shortcut to close is esc key" class="shortcut">[esc]</span></span></h2>
      <div class="left-half">
          <p>Copy-paste bookmark data in <a href="https://msdn.microsoft.com/en-us/library/aa753582(v=vs.85).aspx" target="_blank">Netscape HTML Format</a>. This is the default format of exported bookmarks from Chrome, Kippt, and Delicious.</p>
          <div class="row"><textarea name="bookmark_data" placeholder="Paste bookmark HTML data"></textarea></div>
          <!--<p>Or upload the file directoy</p>-->
          <div class="row"><button class="parse nice-button">Parse</button></div>
      </div><!--/.left-half -->
      <div class="right-half">
        <div class="fixer">
          <p>Imported bookmarks will be saved to your Queue</p>
          <div class="preview">
            <h4>Bookmarks to be Imported</h4>
            <div class="list"></div>
          </div>
          <form class="nice">
            <div class="row"><input type="submit" value="Import"></input></div>
          </form>
        </div><!--/.fixer -->
      </div><!--/.right-half -->
      <br style="clear:both" />
    </div>
  </div>
</div>
