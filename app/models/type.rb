class Type < ApplicationRecord
  has_many :entries, dependent: :destroy
end