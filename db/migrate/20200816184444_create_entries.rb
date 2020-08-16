class CreateEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :entries do |t|
      t.date :date
      t.string :content

      t.timestamps
    end
  end
end
