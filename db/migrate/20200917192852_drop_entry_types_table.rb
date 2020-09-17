class DropEntryTypesTable < ActiveRecord::Migration[6.0]
  def change
  	drop_table(:entry_types) if table_exists? :entry_types
  end
end
