class Entry < ApplicationRecord
  belongs_to :type
  accepts_nested_attributes_for :type
end
