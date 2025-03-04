require_relative "./config"

kids = DB[:kids]

elliot = kids.insert(
  name: "Elliot",
  age: 8,
  image_file: "basketball.jpg"
)

max = kids.insert(
  name: "Max",
  age: 3,
  image_file: "unicorn.jpg"
)

routines = DB[:routines]

get_out_the_door = routines.insert(
  name: "Get Out the Door",
  total_time: 30,
  description: "Let's go! Let's go!",
  status: "in_progress",
  kid_ids: "#{elliot}, #{max}",
  owner_id: 1
)

rewards = DB[:rewards]

bluey = rewards.insert(
  name: "Bluey!!!!",
  link: "https://www.youtube.com/watch?v=Nq__UKI0dJM",
  routine_id: get_out_the_door
)

routine_tasks = DB[:routine_tasks]

shoes = routine_tasks.insert(
  name: "Put on shoes. Yes, both of them.",
  routine_id: get_out_the_door,
  buffer_time: 1,
  image_file: "shoes.jpg",
  audio_file: "shoes.png",
  kids_completed: "",
  status: "in_progress"
)

backpack = routine_tasks.insert(
  name: "Grab your backpack. No you can't bring bring the cat to school.",
  routine_id: get_out_the_door,
  buffer_time: 3,
  image_file: "backpack.png",
  audio_file: "backpack.png",
  kids_completed: "",
  status: "in_progress"
)

umbrella = routine_tasks.insert(
  name: "It's going to rain, grab and umbrella.",
  routine_id: get_out_the_door,
  filter: "weather",
  filter_value: "rain",
  buffer_time: 3,
  image_file: "umbrella.png",
  audio_file: "umbrella.png",
  kids_completed: "",
  status: "in_progress"
)

coat = routine_tasks.insert(
  name: "Put a coat on!",
  routine_id: get_out_the_door,
  filter: "weather",
  filter_value: "cold",
  buffer_time: 3,
  image_file: "coat.png",
  audio_file: "coat.png",
  kids_completed: "",
  status: "in_progress"
)

water_bottle = routine_tasks.insert(
  name: "Grab your water bottle. Is it full?",
  routine_id: get_out_the_door,
  buffer_time: 3,
  image_file: "water_bottle.png",
  audio_file: "water_bottle.png",
  kids_completed: "",
  status: "in_progress"
)

sunscreen = routine_tasks.insert(
  name: "Put on sunscreen. Hold still!",
  routine_id: get_out_the_door,
  filter: "weather",
  filter_value: "sunny",
  buffer_time: 3,
  image_file: "sunscreen.png",
  audio_file: "sunscreen.png",
  kids_completed: "",
  status: "in_progress"
)
