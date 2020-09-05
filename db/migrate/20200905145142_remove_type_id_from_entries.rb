class RemoveTypeIdFromEntries < ActiveRecord::Migration[6.0]
  def change
    remove_column :entries, :type_id, :integer
  end
end
