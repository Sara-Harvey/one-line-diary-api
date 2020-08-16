class EntryType < ApplicationRecord
  belongs_to :entry
  belongs_to :type
end
