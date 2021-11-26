module.exports = {
  apps: [
    {
      name: 'site',
      exec_mode: 'fork_mode',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
