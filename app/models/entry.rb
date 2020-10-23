class Entry < ApplicationRecord
  belongs_to :category
  accepts_nested_attributes_for :category
end

# collection_select(object, method, collection, value_method, 
# text_method, options = {}, html_options = {})
