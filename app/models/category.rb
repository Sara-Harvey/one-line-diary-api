class Category < ApplicationRecord
  has_many :entries, dependent: :destroy
end