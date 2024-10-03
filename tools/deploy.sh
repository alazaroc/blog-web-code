# #!/usr/bin/env bash
# #
# # Build, test and then deploy the site content to 'origin/<pages_branch>'
# #
# # Requirement: html-proofer, jekyll
# #
# # Usage: See help information

# set -eu

# SITE_DIR="_site"
# _config="_config.yml"
# _baseurl=""
# _opt_dry_run=false

# help() {
#   echo "Build and test the site content"
# }

# init() {
#   if [[ -z ${GITHUB_ACTION+x} && $_opt_dry_run == 'false' ]]; then
#     echo "ERROR: It is not allowed to deploy outside of the GitHub Action envrionment."
#     exit -1
#   fi
#   _baseurl="$(grep '^baseurl:' $_config | sed "s/.*: *//;s/['\"]//g;s/#.*//")"
# }

# build() {
#   if [[ -d $SITE_DIR ]]; then
#     rm -rf "$SITE_DIR"
#   fi
#   JEKYLL_ENV=production bundle exec jekyll b -d "$SITE_DIR$_baseurl" --config "$_config"
# }

# test() {
#   bundle exec htmlproofer \
#     --disable-external \
#     --allow-hash-href \
#     "$SITE_DIR"
# }

# main() {
#   init
#   build
#   test
# }

# main
