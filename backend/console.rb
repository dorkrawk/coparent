require 'irb'  # Use IRB for an interactive Ruby shell

Dir["./models/*.rb"].each {|file| require file }

IRB.start
