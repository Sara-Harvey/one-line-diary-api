class RemoveIdFromTypes < ActiveRecord::Migration[6.0]
  def change
    remove_column :types, :entry_id, :integer
  end
end
