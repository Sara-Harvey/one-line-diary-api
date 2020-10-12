class AddEntryToTypes < ActiveRecord::Migration[6.0]
  def change
  	add_reference :types, :entry, foreign_key: true
  end
end