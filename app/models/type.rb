class Type < ApplicationRecord
  has_many :entry_types
  has_many :entries, through: :entry_types
end
