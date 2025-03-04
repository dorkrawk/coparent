require 'sequel'
DB_PATH = "./db/database.db"
DB = Sequel.sqlite(DB_PATH)
require 'json'
require 'dotenv/load'

require_relative "kid"
require_relative "routine_task"
require_relative "open_weather_api"

class Routine < Sequel::Model(:routines)

  STATUSES = {
    inactive: "inactive",
    in_progress: "in_progress",
    complete: "complete"
  }

  PORTLAND_LAT = 45.5078
  PORTLAND_LON = -122.6897

  def response_values
    response_object = values
    response_object[:kids] = kids.map(&:values)
    response_object[:kid_ids] = kid_ids
    response_object[:routine_tasks] = filtered_routine_tasks.map(&:values)
    response_object[:reward] = reward.values

    response_object
  end

  def routine_tasks
    RoutineTask.where(routine_id: id)
  end

  def filtered_routine_tasks
    tasks_after_filter = routine_tasks.where(filter: nil).all

    tasks_after_filter.concat weather_based_routine_tasks(PORTLAND_LAT, PORTLAND_LON)

    tasks_after_filter.uniq
  end

  def weather_based_routine_tasks(lat, lon)
    weather_client = OpenWeatherAPI.new(lat, lon, ENV['OPEN_WEATHER_API_KEY'])
    onecall_resp = weather_client.onecall

    temp = onecall_resp["current"]["feels_like"]
    weather = onecall_resp["current"]["weather"].first["main"]

    weather_tasks = []
    if temp < 60
      weather_tasks.concat routine_tasks.where(filter: "weather", filter_value: "cold").all
    end
    if weather.downcase.include?("cloud") || weather.downcase.include?("rain")
      weather_tasks.concat routine_tasks.where(filter: "weather", filter_value: "rain").all
    end
    if weather.downcase.include?("clear")
      weather_tasks.concat routine_tasks.where(filter: "weather", filter_value: "sunny").all
    end

    weather_tasks.uniq
  end

  def check_and_update_status!
    complete! if filtered_routine_tasks.all?(&:complete?)
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

  def complete!
    update(status: STATUSES[:complete])
  end

  def complete?
    status == STATUSES[:complete]
  end
end
