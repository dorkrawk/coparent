require 'sinatra/base'
require 'sequel'
require 'json'
require 'sinatra/cors'

# require_relative "db/config"

Dir["./models/*.rb"].each {|file| require file }

class App < Sinatra::Base
  set :allow_origin, '*'
  set :allow_methods, 'GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE'
  set :allow_headers, 'content-type, if-modified-since, authorization'
  set :expose_headers, 'location, link'

  before do
    content_type :json
    response.headers['Access-Control-Allow-Origin'] = '*'  # Allow all origins
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
  end

  options '*' do
    response.headers['Access-Control-Allow-Origin'] = '*'  # Allow all origins
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    200
  end

  get '/' do
    "Coparent!"
  end

  get '/routine/:id' do

  end

  put '/routine/:id/start' do
    routine_id = params[:id]

    routine = Routine[routine_id]

    if routine
      routine.response_values.to_json
    else
      status 404 
      { error: "Routine not found" }.to_json
    end
  end

  put '/routine_task/:id/complete' do
    content_type :json

    routine_task_id = params[:id]
    routine_task = RoutineTask[routine_task_id]

    if routine_task
      begin
        data = JSON.parse(request.body.read)
        routine_task.complete_for_kid!(data["kid_id"])
        routine_task.refresh

        routine = Routine[routine_task.routine_id]

        routine.response_values.to_json
      rescue JSON::ParserError
        status 400
        { error: "Invalid JSON format" }.to_json
      rescue Sequel::ValidationFailed => e
        status 422
        { error: e.message }.to_json
      end
    else
      status 404
      { error: "RoutineTask not found" }.to_json
    end
  end


  get '/routine/:id' do
    content_type :json

    task_id = params[:id]
    task = Task[task_id]
    
    if task
      task.values.to_json
    else 
      status 404 
      { error: "Task not found" }.to_json
    end
  end

  post '/tasks' do
    content_type :json
    
    begin
      data = JSON.parse(request.body.read)
      task = Task.create(
        title: data["title"],
        description: data["description"],
        assignee_id: data["assignee_id"],
        completed: data.fetch("completed", false)
      )
      status 201
      { message: "Task created", task: task.values }.to_json
    rescue JSON::ParserError
      status 400
      { error: "Invalid JSON format" }.to_json
    rescue Sequel::ValidationFailed => e
      status 422
      { error: e.message }.to_json
    end
  end

  put '/tasks/:id' do
    content_type :json

    task_id = params[:id]
    task = Task[task_id]

    if task
      begin
        data = JSON.parse(request.body.read)

        task.update(
          title: data["title"] || task.title,
          description: data["description"] || task.description,
          assignee_id: data["assignee_id"] || task.assignee_id,
          completed: data.key?("completed") ? data["completed"] : task.completed
        )

        status 200
        { message: "Task updated", task: task.values }.to_json
      rescue JSON::ParserError
        status 400
        { error: "Invalid JSON format" }.to_json
      end
    else
      status 404
      { error: "Task not found" }.to_json
    end
  end

  # non-REST-y stuff

  put '/tasks/:id/complete' do
    content_type :json

    task_id = params[:id]
    task = Task[task_id]

    if task
      task.complete!
      status 200
      { message: "Task completed", task: task.values }.to_json
    else
      status 404
      { error: "Task not found" }.to_json
    end 
  end

  get '/page' do
    @page_title = "page"
    erb :page
  end

  run! if app_file == $0
end

