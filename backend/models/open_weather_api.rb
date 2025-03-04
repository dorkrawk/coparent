require 'net/http'

class OpenWeatherAPI

  OPENWEATHER_URL_BASE = "https://api.openweathermap.org/data/2.5"
  OPENWEATHER3_URL_BASE = "https://api.openweathermap.org/data/3.0"
  CURRENT = "weather"
  DAILY = "forecast/daily"
  ONECALL = "onecall"
  HISTORICAL = "onecall/timemachine"

  def initialize(lat, lon, api_key)
    @lat = lat
    @lon = lon
    @api_key = api_key
    @base_params = "lat=#{@lat}&lon=#{@lon}&units=imperial&appid=#{@api_key}"
  end

  def current_weather
    current_weather_url = "#{OPENWEATHER_URL_BASE}/#{CURRENT}?#{@base_params}"
    uri = URI(current_weather_url)
    response = Net::HTTP.get(uri)

    JSON.parse(response)
  end

  def onecall
    onecall_weather_url = "#{OPENWEATHER3_URL_BASE}/#{ONECALL}?#{@base_params}"
    uri = URI(onecall_weather_url)
    response = Net::HTTP.get(uri)

    JSON.parse(response)
  end

  def historical_weather(unix_timestamp)
    historical_weather_url = "#{OPENWEATHER_URL_BASE}/#{HISTORICAL}?#{@base_params}&dt=#{unix_timestamp}"
    uri = URI(historical_weather_url)
    response = Net::HTTP.get(uri)

    JSON.parse(response)
  end
end
