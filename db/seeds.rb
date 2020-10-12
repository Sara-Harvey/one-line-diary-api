# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

event = Type.create(name: "event")
quote = Type.create(name: "quote")

first_entry = Entry.create(date: "2009-09-01", content: "I can do this.", type_id: event.id)