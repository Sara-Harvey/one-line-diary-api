class EntrySerializer < ActiveModel::Serializer
  has_many :types
  attributes :id, :date, :content  
end
