class Entry < ApplicationRecord
  belongs_to :category
  accepts_nested_attributes_for :category
end
