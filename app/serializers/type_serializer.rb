class TypeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :entry_id
  has_many :entries
end