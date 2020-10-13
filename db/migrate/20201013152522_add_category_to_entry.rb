class AddCategoryToEntry < ActiveRecord::Migration[6.0]
  def change
  	add_reference :entries, :category, foreign_key: true
  end
end
