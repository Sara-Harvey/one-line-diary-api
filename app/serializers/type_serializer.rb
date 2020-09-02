class TypeSerializer < ActiveModel::Serializer
  belongs_to :entry

  attributes :id, :entry_id, :name
  #has_many :entries
end
