class CreateEntryTypes < ActiveRecord::Migration[6.0]
  def change
    create_table :entry_types do |t|
      t.integer :entry_id
      t.integer :type_id

      t.timestamps
    end
  end
end
