class AddIdToTypes < ActiveRecord::Migration[6.0]
  def change
    add_column :types, :entry_id, :integer
  end
end
