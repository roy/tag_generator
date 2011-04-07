require 'rubygems'
#begin
#  require 'bundler/setup'
#rescue LoadError
#  puts 'You must `gem install bundler` and `bundle install` to run rake tasks'
#end

require 'rake'
require 'rake/packagetask'
require 'yaml'

require "sprockets"

module TagGeneratorHelper
  ROOT_DIR      = File.expand_path(File.dirname(__FILE__))
  SRC_DIR       = File.join(ROOT_DIR, 'src')
  DIST_DIR      = File.join(ROOT_DIR, 'dist')
  
  def self.sprocketize(options = {})
    options = {
      :destination    => File.join(DIST_DIR, options[:source]),
      :strip_comments => true
    }.merge(options)
    
    load_path = [SRC_DIR]
    
    secretary = Sprockets::Secretary.new(
      :root           => File.join(ROOT_DIR, options[:path]),
      :load_path      => load_path,
      :source_files   => [options[:source]],
      :strip_comments => options[:strip_comments]
    )
    
    secretary.concatenation.save_to(options[:destination])
  end
end

task :test => ["build", "test:run"]
namespace :test do
  task :run do
    system("nodeunit test/unit")
  end
end

desc "Build the distribution"
task :build do
  TagGeneratorHelper.sprocketize(
    :path => 'src',
    :source => 'tag_generator.js'
  )
end
