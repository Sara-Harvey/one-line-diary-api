class Entry < ApplicationRecord
  has_many :types

  #has_many :entry_types
  #has_many :types, through: :entry_types
end
