class AddTypeToEntries < ActiveRecord::Migration[6.0]
  def change
  	add_reference :entries, :type, foreign_key: true
  end
end
