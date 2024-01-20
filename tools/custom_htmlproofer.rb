require 'bundler/setup'
Bundler.require(:default, :test)
require 'html-proofer'
require 'optparse'

# Custom Check class
class CustomUrlChecker < HTMLProofer::Check
  def run
    return unless @type == :links  # Ensure we're only checking links

    @html.css('a').each do |node|
      url = node['href'].to_s.strip
      puts "Analyzing URL: #{url}"  # Log the URL being analyzed
      next if url == '#/'  # Explicitly skip checking for href="#/"
      next if url == '/'  # Explicitly skip checking for href="/"

    end
  end
end

# Initialize options hash
options = {
  :disable_external => false,
  :check_html => false,
  :allow_hash_href => false
}

# Parse command line options
OptionParser.new do |opts|
  opts.banner = "Usage: custom_htmlproofer.rb [options]"

  opts.on("--disable-external", "Disable external link checks") do
    options[:disable_external] = true
  end

  opts.on("--check-html", "Enable HTML checks") do
    options[:check_html] = true
  end

  opts.on("--allow-hash-href", "Allow hash href") do
    options[:allow_hash_href] = true
  end
end.parse!

# Directory to check
directory_to_check = ARGV[0] || '_site'

# Configure HTMLProofer
htmlproofer_options = {
  :disable_external => options[:disable_external],
  :check_html => options[:check_html],
  :allow_hash_href => options[:allow_hash_href],
  :checks_to_ignore => ['CustomUrlChecker']
}

# Run HTMLProofer with custom checker
HTMLProofer.check_directory(directory_to_check, htmlproofer_options).run do |config|
  config.add_checker(CustomUrlChecker)
end
