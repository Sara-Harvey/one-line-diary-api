class EntrySerializer < ActiveModel::Serializer
  attributes :id, :date, :content
  has_many :types
  #has_many :entry_types
end
