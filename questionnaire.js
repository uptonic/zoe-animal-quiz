// Create an array of our animals
const animals = [
  { name: "panda", fullName: "Red Panda", emoji: "🐼" },
  { name: "fish", fullName: "Beta Fish", emoji: "🐟" },
  { name: "bear", fullName: "Polar Bear", emoji: "🐻" },
  { name: "squirrel", fullName: "Squirrel", emoji: "🐿" },
  { name: "osprey", fullName: "Osprey", emoji: "🦅" },
  { name: "iguana", fullName: "Iguana", emoji: "🦎" },
  { name: "bobcat", fullName: "Bobcat", emoji: "🐈" },
  { name: "zebra", fullName: "Zebra", emoji: "🦓" },
  { name: "rabbit", fullName: "Rabbit", emoji: "🐰" }
]

// Store answers as they roll in
let answers = []
let animal = null
let selectedAnswers = null

// Click the button to tabulate your result
$(document).on("click", "[data-behavior~=tabulate-result]", function(event) {
  event.preventDefault()

  // Find all selected answers
  selectedAnswers = $('input[type=radio]:checked')

  // Add the selections to the answers array
  selectedAnswers.each(function(){
    answers.push(this.value.split(","))
  })

  // Get the most common animal across your answers
  animal = mode([].concat.apply([], answers))

  // Display your animal
  $("[data-role=animal-emoji]").html(getAnimal(animal).emoji)
  $("[data-role=animal-name]").html(getAnimal(animal).fullName)
  $(".zoom").fadeIn("fast")

  // Reset the form
  $('form').get(0).reset()

  // Reset the animals array
  answers = []
})

// Click an animal
$(document).on('click', "[data-behavior~=unzoom]", function(event) {
  $(".zoom").fadeOut("fast")
  event.preventDefault()
})

// Find the full name and emoji of the selected animal
function getAnimal(animal) {
  return animals.find(function(obj) { return obj.name === animal })
}

// Find the most frequent, unique item in the merged array
function mode(arr) {
  return arr.sort((a,b) =>
      arr.filter(v => v===a).length
    - arr.filter(v => v===b).length
  ).pop()
}
