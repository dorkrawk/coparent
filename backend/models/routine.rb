require 'sequel'
DB_PATH = "./db/database.db"
DB = Sequel.sqlite(DB_PATH)

require_relative "kid"
require_relative "routine_task"

class Routine < Sequel::Model(:routines)

  STATUSES = {
    inactive: "inactive",
    in_progress: "in_progress",
    complete: "complete"
  }

  def routine_tasks
    RoutineTask.where(routine_id: id)
  end

  def filtered_routine_tasks
    routine_tasks
  end

  def reward
    Reward.where(routine_id: id).first
  end

  def kid_ids
    super ? super.split(",").map(&:to_i) : []
  end

  def kid_ids=(value)
    super(value.join(",")) if value.is_a?(Array)
  end

  def kids
    Kid.where(id: kid_ids)
  end
end
