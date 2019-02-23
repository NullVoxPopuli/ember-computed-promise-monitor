workflow "Default" {
  on = "push"
  resolves = [
    "Lint JS",
    "Tests",
    "Dependencies",
  ]
}

action "Lint JS" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Dependencies"]
  args = "lint:js"
  runs = "yarn"
}

action "Lint HBS" {
  needs = ["Dependencies"]
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "yarn"
  args = "lint:hbs"
}

action "Tests" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Lint HBS", "Lint JS"]
  runs = "yarn"
  args = "test"
}

action "Dependencies" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "yarn"
  args = "install"
}
