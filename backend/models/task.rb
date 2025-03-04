require_relative "../db/config"

class Task < Sequel::Model

  def complete!
    update(completed: true)
  end
end
